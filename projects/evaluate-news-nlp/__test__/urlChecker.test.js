import { goodUrl } from "../src/client/js/urlChecker"
   
describe("Testing the url checker functionality", () => {
    test("Testing the goodUrl() function", () => {
          // Define the input for the function, if any, in the form of variables/array
          // Define the expected output, if any, in the form of variables/array
          // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
          // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
          expect(goodUrl).toBeDefined();
    })});