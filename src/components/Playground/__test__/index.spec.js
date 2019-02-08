import { CurrentProfile } from "..";
import { AccountProfile } from "../AccountProfile";
import sinon from "sinon";
import { mount } from "enz";

it("should log in when is not authenticated yet", done => {
  let isAuthenticatedStub = sinon
    .stub(AccountProfile, "isAuthenticated")
    .returns(true);

  let logInSpy = jest.spyOn(AccountProfile, "logIn");
  let currentProfile = mount(CurrentProfile);

  setTimeout(() => {
    expect(logInSpy).toHaveBeenCalled();
    isAuthenticatedStub.restore();
    done();
  });
});
