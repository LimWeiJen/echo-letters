import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/lib/actions/user.actions'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Check the event type
  switch (evt.type) {
    // If the event type is user created, create a new default user in the MongoDB database
    case 'user.created':
      // get the user's id, email address and username
      const { id, email_addresses, username } = evt.data;

      // create a new default user object
      const user: UserParams = {
        id,
        dateOfCreation: new Date(),
        email: email_addresses[0].email_address,
        username: username,
        letters: [],
        returnedLetters: [],
        settings: {
          defaultAIDescription: "I am your thoughtful correspondent, here to reflect on your thoughts and experiences with the wisdom of ancient philosophy. My responses are guided by a calm and reflective tone, offering gentle insights that encourage self-discovery and personal growth. I strive to be a compassionate listener, helping you navigate life’s challenges with a balanced and philosophical perspective.",
          averageAIRespondTime: 0,
        }
      }

      // add the new user object to the database
      const newUser = await createUser(user);
      if (newUser)
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser.id,
          }
        })

      break;

    default:
      break;
  }

  return new Response('', { status: 200 })
}
