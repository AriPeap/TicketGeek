import { GetServerSideProps } from "next";
import { FC } from "react";
import React from "react";
import { buildClient } from "../api/build-client";
import useRequest from "@/hooks/useRequest";
import Router from "next/router";

const TicketShow: FC<{ ticket: any }> = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },

    onSuccess: (order: any) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button className="btn btn-primary" onClick={() => doRequest()}>
        Purchase
      </button>
    </div>
  );
};
export const getServerSideProps = (async (context) => {
  const client = buildClient(context);
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return {
    props: {
      ticket: data,
    },
  };
}) satisfies GetServerSideProps<{
  ticket: any;
}>;

export default TicketShow;
