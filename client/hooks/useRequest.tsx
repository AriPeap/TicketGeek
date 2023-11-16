import axios, { AxiosRequestConfig, Method } from "axios";
import { JSXElementConstructor, useState } from "react";
import { CustomError } from "@ywtickets/common";
import React from "react";

interface Props {
  url: string;
  method: Method | undefined;
  body: any;
  onSuccess: any;
}

export default ({ url, method, body, onSuccess }: Props) => {
  const [errors, setErrors] = useState<any>(null);

  const doRequest = async (props = {}) => {
    try {
      let config: AxiosRequestConfig = {
        url: url,
        method: method,
        data: { ...body, ...props },
      };
      setErrors(null);
      const response = await axios.request(config);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err: any) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops..</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err: CustomError) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
