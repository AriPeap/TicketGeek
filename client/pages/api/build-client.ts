import axios from "axios";

const buildClient = ({ req: { headers } }: any) => {
  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/",
    headers,
  });
};

export { buildClient };
