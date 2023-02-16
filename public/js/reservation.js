const reservationHandler = async (event) => {
  event.preventDefault();

  // Collect values from the reservation form
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

    // Send a PUT request to the API endpoint
    const response = await fetch(`/api/boat/${id}`, {
      method: "PUT",
      body: JSON.stringify({ availability: false }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  
};

document.querySelector("#reservation-btn").addEventListener("click", reservationHandler);
