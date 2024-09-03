<template>
  <div class="home-page">
    <h1>Welcome to the School Website</h1>
    <Button label="Primary Button" class="p-mr-2 p-mb-2"></Button>
    <Button label="Secondary Button" class="p-button-secondary p-mb-2"></Button>

    <Card header="Home Page" subheader="Main Information" class="p-mt-4">
      <p>
        You are not logged in. Use the buttons above to navigate through the website or log in to access more features.
      </p>
      <template #footer>
        <Button label="Learn More" icon="pi pi-info-circle" class="p-button-help"></Button>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-page {
  padding: 2rem;
  text-align: center;
}
</style>
