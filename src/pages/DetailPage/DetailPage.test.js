import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import DetailPage from "./DetailPage";

const humanoid = {
  id: 2,
  name: "Mario",
  surname: "Wolff",
  address: "1180 Ridge Road Cape",
  bio: "Though I cannot tell why it was exactly that those stage managers, the Fates, put me down for this shabby part of a whaling voyage, when others were set down for magnificent parts in high tragedies, and short and easy parts in genteel comedies, and jolly parts in farces—though I cannot tell why this was exactly; yet, now that I recall all the circumstances, I think I can see a little into the springs and motives which being cunningly presented to me under various disguises, induced me to set about performing the part I did, besides cajoling me into the delusion that it was a choice resulting from my own unbiased freewill and discriminating judgment.",
  city: "Titus",
  country: "New Mexico",
  email: "about@gmail.com",
  mobile: "(040) 692-8329",
  phone: "(198) 839-0434",
  zip_code: 31519,
  img_url:
    "/static/profile_images/91ef67bc-3a5f-11ec-9a95-0108907c9f6b_300.jpg",
};

test("renders correct humanoid detail page", async () => {
  const server = setupServer(
    rest.get("http://localhost:8000/api/humanoids/2", (req, res, ctx) => {
      return res(ctx.json(humanoid));
    })
  );

  server.listen();

  const history = createMemoryHistory();
  history.push("/detail/2");

  render(
    <Router history={history}>
      <Route path="/detail/:id">
        <DetailPage />
      </Route>
    </Router>
  );

  await waitFor(() => screen.getByText("Mario Wolff"));

  expect(screen.getByText("Mario Wolff")).toBeInTheDocument();
  expect(screen.getByText("New Mexico")).toBeInTheDocument();
  expect(screen.getByText("email - about@gmail.com")).toBeInTheDocument();

  server.close();
});
