import { Request, Response } from "express";
import * as https from "https"; // Import https module
import * as http from "http";

export const paystack = (req: Request, res: Response): void => {
  const params = JSON.stringify({
    email: req.query.email,
    amount: req.query.amount,
    plan: "PLN_gtkia9318pnvxdv",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: "Bearer sk_test_0da0864704854cee9e65ce11fee2b7492cbe4b10",
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack: http.IncomingMessage) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data);
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
};

export const starter = (req: Request, res: Response): void => {
  const params = JSON.stringify({
    email: req.query.email,
    amount: req.query.amount,
    plan: "PLN_42lzcdg9tc74grn",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack: http.IncomingMessage) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data);
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
};

export const pro = (req: Request, res: Response): void => {
  const params = JSON.stringify({
    email: req.query.email,
    amount: req.query.amount,
    plan: "PLN_shxbqgdby3rhc36",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack: http.IncomingMessage) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data);
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
};

export const supreme = (req: Request, res: Response): void => {
  const params = JSON.stringify({
    email: req.query.email,
    amount: req.query.amount,
    plan: "PLN_csj7his4ap1g00o",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack: http.IncomingMessage) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data);
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
};

export const starterPlus = (req: Request, res: Response): void => {
  const params = JSON.stringify({
    email: req.query.email,
    amount: req.query.amount,
    plan: "PLN_w4wy9n0roqy6vky",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack: http.IncomingMessage) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data);
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
};

export const proPlus = (req: Request, res: Response): void => {
  const params = JSON.stringify({
    email: req.query.email,
    amount: req.query.amount,
    plan: "PLN_6thdp4424bzqesi",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack: http.IncomingMessage) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data);
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
};

export const supremePlus = (req: Request, res: Response): void => {
  const params = JSON.stringify({
    email: req.query.email,
    amount: req.query.amount,
    plan: "PLN_tb3b79lme2dnx6r",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack: http.IncomingMessage) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data);
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
};
