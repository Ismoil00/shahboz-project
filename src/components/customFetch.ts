import Notify from "../components/toast";
import type { UserSession } from "../globalTypes";

let onlyOne = 1; // to prevent infinite loop

export default async function customServerRequest(
  endpoint: string,
  method: string = "GET",
  body?: any,
  headers?: { [index: string]: string },
  formdata: boolean = false
): Promise<any> {
  try {
    const session: string | null = localStorage.getItem("session");

    console.log("BODY", body)

    if (!session) throw new Error("Session not found");
    const parsedSession: UserSession = JSON.parse(session);

    // request to the server
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
      {
        method,
        headers: {
          Accept: "application/json",
          authorization: "Bearer " + parsedSession["access_token"],
          ...(method !== "GET" && !formdata
            ? { "Content-Type": "application/json" }
            : {}),
          ...(headers || {}),
        },
        ...(method !== "GET" && {
          body: formdata ? body : JSON.stringify(body),
        }),
        credentials: "include",
      }
    ); // 403, 401, 200, ...;

    if (Number(response.status.toString()[0]) === 2) {
      onlyOne = 1;
      return response;
    } else if (
      response.status === 401 &&
      response.statusText === "Unauthorized" &&
      onlyOne === 1
    ) {
      return await getNewAccessToken(
        parsedSession,
        endpoint,
        method,
        body,
        headers,
        formdata
      );
    }
    // else if (
    //   response.status === 403 &&
    //   response.statusText === "RedirectToLoginPage"
    // ) {
    //   await redirectUserToLogin(response);
    // }
    else throw response;
  } catch (error) {
    onlyOne = 1;
    return error;
  }
}

async function getNewAccessToken(
  session: UserSession,
  endpoint: string,
  method: string = "GET",
  body?: any,
  headers?: { [index: string]: string },
  formdata: boolean = false
): Promise<any> {
  try {
    onlyOne++;
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/refresh/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          authorization: "Bearer " + session["access_token"],
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ refresh: session["refresh_token"] }),
      }
    ); // 403, 500, 200

    if (Number(response.status.toString()[0]) !== 2) throw response;
    console.log("REFRESH TOKEN RESPONSE", response);

    const data = await response.json();
    localStorage.setItem(
      "session",
      JSON.stringify({ ...session, access_token: data["access"] })
    );

    return await customServerRequest(endpoint, method, body, headers, formdata);
  } catch (error: any) {
    onlyOne = 1;
    if (error.status === 401 && error.statusText === "Unauthorized") {
      redirectUserToLogin(error);
      return;
    }

    return error;
  }
}

async function redirectUserToLogin(res: Response) {
  const data = await res.json();

  Notify(data.msg, "error");
  localStorage.removeItem("session");
  setTimeout(() => {
    window.location.href = "/login";
  }, 5000);
}
