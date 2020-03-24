import { useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

export const login = ({ token, expires }) => {
  cookie.set("token", token, { expires });
  Router.push("/profile");
};

export const auth = ctx => {
  const { token } = nextCookie(ctx);
  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (ctx.req) {
      // If `ctx.req` is available it means we are on the server.
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    } else {
      // This should only happen on client.
      Router.push("/login");
    }
  }
  return token;
};

export const logout = () => {
  cookie.remove("token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};

export const isLoggedIn = ctx => {
  const { token } = nextCookie(ctx);
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const loginCheckout = ({ token, expires }) => {
  cookie.set("token", token, { expires });
  Router.push("/checkout");
};
