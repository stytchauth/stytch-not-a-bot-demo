"use client";

import { StytchLogin } from "@stytch/nextjs";
import { OAuthProviders, Products } from "@stytch/vanilla-js";
import { getDomainFromWindow } from "../../lib/urlUtils";

/*
 * Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch.
 *
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/sdks/javascript-sdk#ui-configs.
 */
const Login = () => {
  const domain = getDomainFromWindow();
  const styles = {
    colors: {
      primary: "#FFFFFF",
      secondary: "#ADBCC5",
      success: "#0C5A56",
      error: "#8B1214",
    },
    container: {
      width: "100%",
      backgroundColor: "#18191B",
      borderColor: "#18191B",
    },
    buttons: {
      primary: {
        backgroundColor: "#CAF91F",
        textColor: "#18191B",
        borderColor: "#19303D",
        borderRadius: "40px",
      },
      secondary: {
        backgroundColor: "#18191B",
        textColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: "40px",
      },
    },
    inputs: {
      backgroundColor: "#18191B",
      borderColor: "#FFFFFF",
      borderRadius: "40px",
      placeholderColor: "#FFFFFF",
      textColor: "#FFFFFF",
    },
    logo: {
      logoImageUrl: "/not-a-bot-logo-white.svg",
    },
  };

  const config = {
    products: [Products.oauth, Products.emailMagicLinks],
    emailMagicLinksOptions: {
      loginRedirectURL: `${domain}/authenticate`,
      loginExpirationMinutes: 60,
      signupRedirectURL: `${domain}/authenticate`,
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: OAuthProviders.Google }],
      loginRedirectURL: `${domain}/authenticate`,
      signupRedirectURL: `${domain}/authenticate`,
    },
  };

  return <StytchLogin config={config} styles={styles} />;
};

export default Login;
