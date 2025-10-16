const form = document.getElementById("registration");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Hide previous messages
  document.getElementById("successMessage").style.display = "none";
  document.getElementById("errorMessage").style.display = "none";

  // Show loading spinner
  document.getElementById("loading").style.display = "block";
  document.getElementById("submitBtn").disabled = true;

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const url = "https://us-central1-pmpro-rachel.cloudfunctions.net/pmCourseUltraContact";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // console.log("Submitting form data...", data);
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    // console.log("Form submitted");
    // const response = { ok: true }; // Simulated response

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("successMessage").style.display = "block";
    e.target.reset();
  }
  catch (error) {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("successMessage").style.display = "none";
    console.error("Error submitting form:", error);
  }
  finally {
    document.getElementById("loading").style.display = "none";
    document.getElementById("submitBtn").disabled = false;
  }
});
