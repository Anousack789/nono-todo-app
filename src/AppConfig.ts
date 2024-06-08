class AppConfig {
  public static readonly API = import.meta.env.VITE_API;
  public static readonly CAPTCHA_SITE_KEY = import.meta.env
    .VITE_CAPTCHA_SITE_KEY;
}

export default AppConfig;
