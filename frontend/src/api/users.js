export const signUpUser = async ({name, email, password}) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/signup`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );
    return await response.json();
}


export const loginUser = async ({email, password}) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/login`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );
    return await res.json();
}