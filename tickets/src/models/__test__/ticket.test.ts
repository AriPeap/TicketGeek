import { Ticket } from "../tickets";

it("implements optimistic concurrency control", async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "The 1975",
    price: 230,
    userId: "oo23ooo",
  });

  // Save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance!.save();

  // save the second fetched ticket and expect an error
  await expect(secondInstance!.save()).rejects.toThrow();
});
