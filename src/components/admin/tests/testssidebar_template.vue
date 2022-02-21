<template>
    <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li">
                <router-link :to="{path:'/tests/list'}" active-class="adminsidebar"><span v-html="$t('tests')"/></router-link>
                </li>
          </ul>
        </div>
      </div>
</template>
<style>
</style>
