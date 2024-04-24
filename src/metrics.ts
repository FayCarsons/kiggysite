type Data = {
  device: string,
  browser: string,
  resolution: string,
  time: string
}

const parseUserAgent = (data: string) => {
  // Define regex patterns for browsers and devices
  const browserRegex = /(firefox|msie|chrome|safari|opera|edg\/|trident)/i;
  const deviceRegex = /(android|iphone|ipad|windows|macintosh|linux)/i;

  // Extract browser and device type using regex match
  const browserMatch = data.match(browserRegex);
  const deviceMatch = data.match(deviceRegex);

  // Normalize the browser name (handle edge cases)
  let browser = browserMatch ? browserMatch[1] : "Unknown Browser";
  if (browser.toLowerCase().includes("edg")) {
    browser = "Edge";
  } else if (browser.toLowerCase() === "trident" || browser.toLowerCase().includes("msie")) {
    browser = "Internet Explorer";
  }

  // Normalize device name
  let device = deviceMatch ? deviceMatch[1] : "Unknown Device";
  if (device.toLowerCase() === "macintosh") {
    device = "Mac";
  }

  return { browser, device };
}

export const getData = () => {
  const deviceInfo = navigator.userAgent;
  const { browser, device } = parseUserAgent(deviceInfo);
  const deviceType = /mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
  return {
    device,
    browser,
    resolution: `${deviceType}: ${window.screen.width}x${window.screen.height}`,
    time: new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  }
}

export const sendData = async (data: Data) => {
  await fetch('https://faycarsons.xyz/store/kiggysite', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
}

