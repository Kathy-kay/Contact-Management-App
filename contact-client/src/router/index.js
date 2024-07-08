import LoginPage from '@/views/LoginPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import EmailVerify from "@/views/EmailVerify.vue"
import ContactList from "@/views/ContactList.vue"
import CreateContact from "@/views/CreateContact.vue"
import { createRouter, createWebHistory } from 'vue-router'
import ContactDetails from '@/views/ContactDetails.vue'
import EditContact from '@/views/EditContact.vue'


const routes = [
  {
    path: "/",
    name: 'sign-in',
    component: LoginPage
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignUpPage
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,

  },
  {
    path: "/sign-up/email/verification",
    name: "email-verification",
    component: ""
  },
  {
    path: "/sign-up/email/verify",
    name: "email-verify",
    component: EmailVerify
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: ContactList
  },
  {
    path: "/contact/create",
    name: "create-contact",
    component: CreateContact
  }, 
  {
    path: "/contact/edit/:id",
    name: "contact edit",
    component: EditContact
  },
  {
    path: "/contact/details/:id",
    name: "contact-details",
    component: ContactDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
