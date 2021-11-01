import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

const mockHumanoids = [
  {
    id: 1,
    name: "Tania",
    surname: "Johnston",
    country: "Alaska",
    thumbnail_url:
      "/static/profile_images/90bbcbd8-3a5f-11ec-9a95-0108907c9f6b_75.jpg",
  },
  {
    id: 2,
    name: "Mario",
    surname: "Wolff",
    country: "New Mexico",
    thumbnail_url:
      "/static/profile_images/91ef67bc-3a5f-11ec-9a95-0108907c9f6b_75.jpg",
  },
  {
    id: 3,
    name: "Maverick",
    surname: "Schuppe",
    country: "Massachusetts",
    thumbnail_url:
      "/static/profile_images/91ef67bd-3a5f-11ec-9a95-0108907c9f6b_75.jpg",
  },
  {
    id: 4,
    name: "Noemi",
    surname: "Turcotte",
    country: "Kansas",
    thumbnail_url:
      "/static/profile_images/9316c0fe-3a5f-11ec-9a95-0108907c9f6b_75.jpg",
  },
];

test("renders correct humanoids list", async () => {
  const server = setupServer(
    rest.get("http://localhost:8000/api/humanoids", (req, res, ctx) => {
      return res(
        ctx.json({
          count: 10,
          next: "http://localhost:8000/api/humanoids?pag=2",
          previous: null,
          results: mockHumanoids,
        })
      );
    }),

    rest.get("http://localhost:8000/api/countries", (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );

  server.listen();

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  await waitFor(() => screen.getByText("Tania Johnston"));

  mockHumanoids.forEach((humanoid) => {
    expect(
      screen.getByText(humanoid.name + " " + humanoid.surname)
    ).toBeInTheDocument();
  });

  server.close();
});
