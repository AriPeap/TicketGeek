import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { buildClient } from "./api/build-client";
import Link from "next/link";

type ticket = {
  id: string;
  title: string;
  price: number;
};

const LandingPage = ({
  currentUser,
  tickets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const ticketList = tickets.map((ticket: ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = (async (context) => {
  const client = buildClient(context);
  const {
    data: { currentUser },
  } = await client.get("api/users/currentuser");
  const { data } = await client.get("/api/tickets");

  return {
    props: {
      currentUser,
      tickets: data,
    },
  };
}) satisfies GetServerSideProps<{
  currentUser: any;
  tickets: any;
}>;

export default LandingPage;
