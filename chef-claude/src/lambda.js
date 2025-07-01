export async function getRecipeFromLambda(ingredientsArray) {
    const commaSeparatedIngredients = ingredientsArray.join(","); // "flour,sugar,eggs"

    const lambdaUrl = "https://gt3nsrrhjr5ontlmodjk6zggya0sawxu.lambda-url.us-east-1.on.aws/";
    const url = `${lambdaUrl}?ingredients=${encodeURIComponent(commaSeparatedIngredients)}`; // Encode for safety

    try {
        const response = await fetch(url); // Wait for the fetch promise to resolve

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text(); 
        return data; // Return the parsed data
    } catch (error) {
        console.error("Error making request:", error);
        throw error; // Re-throw the error for further handling
    }
}
  
  