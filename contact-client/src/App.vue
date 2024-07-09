<script setup>


</script>

<template>
 <div>
  <nav class="h-20 w-full py-4 md:px-20  px-10 bg-slate-100 shadow-md shadow-black-50">
    <ul class="flex justify-between items-center">
      <router-link>
        <li class="font-bold text-xl md:text-2xl">Contact Management</li>
      </router-link>
      <router-link to="/sign-in">
        <button class="text-center bg-blue-900 border-none py-2 px-4 rounded-md text-slate-100">Sign-in</button>
      </router-link>
    </ul>
    
  </nav>
  <router-view />
 </div>
</template>



