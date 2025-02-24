const list = ["dev", "test", "pro"];
const hostname = location.hostname;
const env = list.find((item) => hostname.includes(item));
let host = location.host;

const prodObj = {
  mainApi: {
    "mdp.enbrands.com": {
      api: "",
      publicApi: "https://tb-gateway.enbrands.com",
    },
  },
  loginWeb: "https://coslogin.enbrands.com",
};

const testObj = {
  mainApi: {
    "18.ali-test-k8s.enbrands.com": {
      api: "",
      publicApi: "https://ab.tb-test-k8s.enbrands.com",
    },
    "mdp-tx-test.enbrands.com": {
      api: "",
      publicApi: "https://gateway-all-test.enbrands.com",
    },
  },
  loginWeb: "https://login.all-test-k8s.enbrands.com",
};

const devObj = {
  mainApi: {
    "alidev-authlogin.enbrands.com": {
      api: "",
      publicApi: "http://alidev-authlogin.enbrands.com/gateway",
    },
  },
  loginWeb: "https://alidev-authlogin.enbrands.com/login",
};

export default (() => {
  let config: any;
  switch (env) {
    case "dev": {
      config = devObj;
      break;
    }
    case "test": {
      config = testObj;
      break;
    }
    case "pro": {
      config = prodObj;
      break;
    }
    default: {
      config = prodObj;
      break;
    }
  }
  if (hostname === "localhost") {
    config = testObj;
    config.loginWeb = "http://localhost:8080";
  }

  const obj = {
    loginWeb: config.loginWeb,
    api: config.mainApi[host]?.api,
    publicApi: config.mainApi[host]?.publicApi,
  };
  return obj;
})();
