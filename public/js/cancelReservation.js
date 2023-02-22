const reservationHandler = async (event) => {
  event.preventDefault();

  // Collect values from the reservation form
  const id = document.querySelector("#cancel-reservation").value;
  // Send a PUT request to the API endpoint
  const response = await fetch(`/api/boat/reservation/${id}`, {
    method: "PUT",
    body: JSON.stringify({ availability: true }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // If successful, redirect the browser to the dashboard page
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#cancel-reservation")
  .addEventListener("click", reservationHandler);
