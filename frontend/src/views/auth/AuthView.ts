import { test, expect } from "vitest";
import { render } from "vitest-browser-vue";
import SignUp from "./SignUpView.vue";

test("renders title", async () =>{
    const { getByText} = render(SignUp)
    await expect.element(getByText("welcome to fintrack")).toBeInTheDocument();
})