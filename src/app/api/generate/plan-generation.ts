export async function generatePlan(userInput: string, userData: { age: string | number, heartRate: string | number, weight: string | number, bp: string, goal: string }) {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userInput,
          age: userData.age,
          heartRate: userData.heartRate,
          weight: userData.weight,
          bp: userData.bp,
          goal: userData.goal,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate response');
      }
  
      const reader = response.body?.getReader();
      let aiResponse = '';
  
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          aiResponse += chunk;
        }
      }
  
      return aiResponse;
  
    } catch (error) {
      console.error('Error:', error);
      return "I apologize, but I'm having trouble generating the plan. Please try again later.";
    }
  }
  