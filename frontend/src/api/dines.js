export const addDine = async ({name, price, description, image}) => {
  
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/dines`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          name,
          price,
          description,
          image
        })
      }
    );
    return await response.json();
};