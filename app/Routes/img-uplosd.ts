import Route from '@ioc:Adonis/Core/Route'

import Application from '@ioc:Adonis/Core/Application'

Route.post('/img-upload', async ({ request }) => {
  const coverImage = request.file('file')
  if (coverImage) {
    await coverImage.moveToDisk('./')
  }
  return { name: coverImage}
})