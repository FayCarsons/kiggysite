type Data = {
  device: string,
  browser: string,
  resolution: string,
  time: string
}

const parseUserAgent = (data: string) => {
  const browserRegex = /(firefox|msie|chrome|safari|opera|edg\/|trident)/i;
  const deviceRegex = /(android|iphone|ipad|windows|macintosh|linux)/i;

  const browserMatch = data.match(browserRegex);
  const deviceMatch = data.match(deviceRegex);

  let browser = browserMatch ? browserMatch[1] : "Unknown Browser";
  if (browser.toLowerCase().includes("edg")) {
    browser = "Edge";
  } else if (browser.toLowerCase() === "trident" || browser.toLowerCase().includes("msie")) {
    browser = "Internet Explorer";
  }

  let device = deviceMatch ? deviceMatch[1] : "Unknown Device";
  if (device.toLowerCase() === "macintosh") {
    device = "Mac";
  }

  return { browser, device };
}

const getData = () => {
  const deviceInfo = navigator.userAgent;
  const userAgent = parseUserAgent(deviceInfo);
  const deviceType = /mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
  return {
    ...userAgent,
    resolution: `${deviceType}: ${window.screen.width}x${window.screen.height}`,
    time: new Date().toISOString()
  }
}

const sendData = async (data: Data) => {
  await fetch('/store/faycarsons', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
}

export function logUser() {
  try {
    sendData(getData())
  } catch (e) { console.error(`Error logging user data: ${e}`) }
}

export function logUserBackoff(period = 50, attempts = 0, maxAttempts = 16, exponent = 1.5) {
  try {
    sendData(getData())
  } catch (_) {
    if (attempts >= maxAttempts) return
    const periodp = period * Math.pow(exponent, attempts)
    setTimeout(() => {
      logUserBackoff(periodp, attempts + 1, maxAttempts)
    }, periodp)
  }
}

export default { logUser, logUserBackoff }
