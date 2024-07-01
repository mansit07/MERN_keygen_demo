import('node-fetch').then((fetch) => {
  async function main() {
    const email = 'mansi07thakkar@gmail.com';
    const password = 'Mansi@123';

    const credentials = Buffer.from(`${email}:${password}`).toString('base64');

    try {
      const response = await fetch.default('https://api.keygen.sh/v1/accounts/983a9aa8-468d-4e0d-a06d-e3b132ec00d5/tokens', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Authorization': `Basic ${credentials}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to create token: ${response.statusText}`);
      }

      const { data, errors } = await response.json();
      console.log('Token created:', data);
      console.log('Errors:', errors);
    } catch (error) {
      console.error('Error creating token:', error.message);
    }
  }

  main();
});