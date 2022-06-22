<script>
  import { supabase } from "../supabase.js";
  import { user } from "../stores/authStore.js"
  import Navbar from "../components/Navbar.svelte"

  import Auth from '../components/Auth.svelte'
  import "../app.css"

  user.set(supabase.auth.user())

  supabase.auth.onAuthStateChange((event, session) => {
    user.set(session?.user)
  })
</script>

<div>
  {#if $user}
  <Navbar />
  <slot></slot>
  {:else}
  <Auth />
  {/if}
</div>