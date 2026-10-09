import { useEffect } from 'react';
import posthog from 'posthog-js';

let isAnalyticsInitialized = false;

const reportMissingConfiguration = (variableName) => {
  if (import.meta.env.DEV) {
    console.warn(`[Analytics] ${variableName} is not set. Analytics events will be queued or skipped.`);
  }
};

/**
 * Extracts comprehensive client device, hardware, and environment details.
 */
export const detectDeviceInfo = () => {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'Desktop',
      deviceModel: 'Unknown Device',
      os: 'Unknown OS',
      browser: 'Unknown Browser',
      timezone: 'Unknown',
      screenResolution: 'Unknown',
      language: 'en',
    };
  }

  const ua = navigator.userAgent || '';
  let os = 'Unknown OS';
  let deviceType = 'Desktop';
  let deviceModel = 'Unknown Device';

  if (/iPhone/i.test(ua)) {
    deviceType = 'Mobile';
    deviceModel = 'Apple iPhone';
    os = 'iOS';
  } else if (/iPad/i.test(ua)) {
    deviceType = 'Tablet';
    deviceModel = 'Apple iPad';
    os = 'iPadOS';
  } else if (/Android/i.test(ua)) {
    deviceType = /Mobile/i.test(ua) ? 'Mobile' : 'Tablet';
    os = 'Android';
    const match = ua.match(/Android[^;]+;\s*([^;)]+?)(?:\s+Build|\))/i);
    deviceModel = match ? match[1].trim() : 'Android Device';
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    deviceType = 'Desktop';
    deviceModel = 'Apple Mac';
    os = 'macOS';
  } else if (/Windows/i.test(ua)) {
    deviceType = 'Desktop';
    deviceModel = 'Windows PC';
    os = 'Windows';
  } else if (/Linux/i.test(ua)) {
    deviceType = 'Desktop';
    deviceModel = 'Linux Machine';
    os = 'Linux';
  }

  let browser = 'Unknown Browser';
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';

  let timezone = 'Unknown';
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
  } catch {
    // fallback
  }

  const screenResolution = `${window.screen?.width || 0}x${window.screen?.height || 0}`;
  const language = navigator.language || 'en';

  return {
    deviceType,
    deviceModel,
    os,
    browser,
    timezone,
    screenResolution,
    language,
  };
};

/**
 * Checks whether current visitor is the Portfolio Owner (Piyush)
 * Supports:
 * 1. Query param: `?owner=true` or `?me=true` (persists to localStorage)
 * 2. Query param reset: `?owner=false` or `?guest=true` (clears localStorage)
 * 3. LocalStorage persistence: `portfolio_is_owner`
 * 4. Localhost development: automatically owner
 */
export const checkIsOwner = () => {
  if (typeof window === 'undefined') return false;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('owner') === 'true' || urlParams.get('me') === 'true' || urlParams.get('admin') === 'true') {
      localStorage.setItem('portfolio_is_owner', 'true');
      return true;
    }
    if (urlParams.get('owner') === 'false' || urlParams.get('guest') === 'true') {
      localStorage.removeItem('portfolio_is_owner');
      return false;
    }
    if (localStorage.getItem('portfolio_is_owner') === 'true') {
      return true;
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return true;
    }
  } catch {
    // localStorage restricted
  }

  return false;
};

/**
 * Programmatically toggle owner mode
 */
export const setOwnerMode = (isOwner) => {
  try {
    if (isOwner) {
      localStorage.setItem('portfolio_is_owner', 'true');
    } else {
      localStorage.removeItem('portfolio_is_owner');
    }
    setupVisitorProfile(posthog);
  } catch (err) {
    console.error('[Analytics] Failed to toggle owner mode:', err);
  }
};

/**
 * Configures friendly person naming & hardware properties in PostHog
 */
export const setupVisitorProfile = (ph = posthog) => {
  try {
    const isOwner = checkIsOwner();
    const info = detectDeviceInfo();

    let savedContactName = null;
    let savedContactEmail = null;
    try {
      savedContactName = localStorage.getItem('portfolio_contact_name');
      savedContactEmail = localStorage.getItem('portfolio_contact_email');
    } catch {}

    let personName;
    let visitorType;

    const locationCity = info.timezone ? info.timezone.split('/').pop().replace(/_/g, ' ') : '';

    if (isOwner) {
      personName = `Piyush Kumar (Owner - ${info.deviceModel})`;
      visitorType = 'portfolio_owner';
    } else if (savedContactName) {
      personName = `${savedContactName} (${info.deviceModel})`;
      visitorType = 'contact_lead';
    } else {
      // Human-readable visitor label shown on PostHog dashboard!
      personName = `Visitor: ${info.deviceModel} - ${info.browser}${locationCity ? ` (${locationCity})` : ''}`;
      visitorType = 'guest_visitor';
    }

    const personProperties = {
      name: personName,
      visitor_type: visitorType,
      is_portfolio_owner: isOwner,
      device_model: info.deviceModel,
      device_type: info.deviceType,
      os: info.os,
      browser: info.browser,
      screen_resolution: info.screenResolution,
      timezone: info.timezone,
      language: info.language,
    };

    if (savedContactEmail) {
      personProperties.email = savedContactEmail;
    }

    // 1. Register super properties attached to EVERY event
    ph.register({
      visitor_type: visitorType,
      is_portfolio_owner: isOwner,
      device_model: info.deviceModel,
      visitor_label: personName,
      browser: info.browser,
      os: info.os,
    });

    // 2. Set Person Profile in PostHog so Dashboard shows friendly Name instead of random ID
    if (isOwner) {
      ph.identify('piyush-kumar-owner', personProperties);
    } else if (savedContactEmail) {
      ph.identify(savedContactEmail, personProperties);
    } else {
      ph.people.set(personProperties);
    }

    // 3. Optional Chromium userAgentData high-entropy hardware model check
    if (navigator.userAgentData?.getHighEntropyValues) {
      navigator.userAgentData
        .getHighEntropyValues(['model', 'platform', 'platformVersion'])
        .then((data) => {
          if (data.model && data.model !== info.deviceModel) {
            ph.register({ device_model: data.model });
            ph.people.set({
              exact_device_model: data.model,
              platform_version: data.platformVersion,
            });
          }
        })
        .catch(() => {});
    }
  } catch (err) {
    console.error('[Analytics] Error setting up visitor profile:', err);
  }
};

/**
 * Upgrades an anonymous visitor to their real Name & Email once they submit the contact form
 */
export const identifyVisitor = (name, email) => {
  try {
    localStorage.setItem('portfolio_contact_name', name);
    localStorage.setItem('portfolio_contact_email', email);

    const info = detectDeviceInfo();
    const friendlyName = `${name} (${info.deviceModel})`;

    const updatedProps = {
      name: friendlyName,
      email: email,
      visitor_type: 'contact_lead',
      is_portfolio_owner: false,
      device_model: info.deviceModel,
    };

    posthog.identify(email, updatedProps);
    posthog.register({
      visitor_label: friendlyName,
      visitor_type: 'contact_lead',
      is_portfolio_owner: false,
    });
  } catch (err) {
    console.error('[Analytics] Failed to identify visitor:', err);
  }
};

export const initAnalytics = () => {
  const apiKey = import.meta.env.POSTHOG_KEY?.trim();
  const apiHost = (import.meta.env.POSTHOG_HOST || 'https://us.i.posthog.com')?.trim();

  if (!apiKey) {
    reportMissingConfiguration('POSTHOG_KEY');
    return;
  }

  if (!apiHost) {
    reportMissingConfiguration('POSTHOG_HOST');
    return;
  }

  posthog.init(apiKey, {
    api_host: apiHost,
    person_profiles: 'always', // Always creates person profiles so friendly names appear
    autocapture: true, // Captures DOM interactions, clicks, and element metadata
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: null,
    },
    loaded: (ph) => {
      isAnalyticsInitialized = true;
      setupVisitorProfile(ph);
    },
  });

  isAnalyticsInitialized = true;
};

/**
 * Core event tracking helper
 */
export const trackEvent = (eventName, properties = {}) => {
  try {
    if (isAnalyticsInitialized) {
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
        ...properties,
      });
    }
  } catch (err) {
    console.error(`[Analytics] Failed to log event "${eventName}":`, err);
  }
};

/**
 * Track any button click with unique ID and name
 */
export const trackButtonClick = (buttonId, buttonName, properties = {}) => {
  trackEvent('button_clicked', {
    button_id: buttonId,
    button_name: buttonName,
    ...properties,
  });
};

/**
 * Track social profile navigation (LinkedIn, GitHub, Twitter)
 */
export const trackSocialClick = (platform, location, url, buttonId) => {
  trackEvent('social_profile_clicked', {
    button_id: buttonId,
    platform: platform.toLowerCase(),
    placement: location, // 'header' | 'footer'
    destination_url: url,
  });
};

/**
 * Section view tracking hook with dwell time & visibility metrics
 */
export const useSectionTracking = (sections = [
  { id: 'hero', name: 'Hero / Introduction' },
  { id: 'about', name: 'About Me' },
  { id: 'skills', name: 'Skills Showcase' },
  { id: 'projects', name: 'Featured & All Projects' },
  { id: 'contact', name: 'Contact Form' },
  { id: 'footer', name: 'Footer' },
]) => {
  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const sectionTimers = {};
    const viewedSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const sectionMeta = sections.find((s) => (typeof s === 'string' ? s === sectionId : s.id === sectionId));
          const sectionName = typeof sectionMeta === 'object' ? sectionMeta.name : sectionId;

          if (entry.isIntersecting) {
            sectionTimers[sectionId] = Date.now();

            trackEvent('section_viewed', {
              section_id: sectionId,
              section_name: sectionName,
              first_view: !viewedSections.has(sectionId),
              intersection_ratio: Math.round(entry.intersectionRatio * 100) / 100,
            });

            viewedSections.add(sectionId);
          } else if (sectionTimers[sectionId]) {
            const dwellTimeMs = Date.now() - sectionTimers[sectionId];
            delete sectionTimers[sectionId];

            if (dwellTimeMs > 800) {
              trackEvent('section_dwell_time', {
                section_id: sectionId,
                section_name: sectionName,
                dwell_time_seconds: Math.round(dwellTimeMs / 100) / 10,
              });
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((sec) => {
      const id = typeof sec === 'string' ? sec : sec.id;
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);
};

export default posthog;
