<template>
  <div class="page-loader" role="status" aria-label="Loading CLM Consultants">
    <span class="jimu-primary-loading" aria-hidden="true"></span>
  </div>
</template>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #fff;
}

.jimu-primary-loading,
.jimu-primary-loading::before,
.jimu-primary-loading::after {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 32px;
  background: #076fe5;
  animation: loading-keys-app-loading 0.8s infinite ease-in-out;
}

.jimu-primary-loading {
  left: 50%;
  margin: -16px 0 0 -7px;
  text-indent: -9999em;
  animation-delay: 0.16s;
}

.jimu-primary-loading::before,
.jimu-primary-loading::after {
  top: 0;
  content: "";
}

.jimu-primary-loading::before {
  left: -20px;
}

.jimu-primary-loading::after {
  left: 20px;
  animation-delay: 0.32s;
}

@keyframes loading-keys-app-loading {
  0%,
  80%,
  100% {
    height: 32px;
    opacity: 0.75;
    box-shadow: 0 0 #076fe5;
  }

  40% {
    height: 40px;
    opacity: 1;
    box-shadow: 0 -8px #076fe5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .jimu-primary-loading,
  .jimu-primary-loading::before,
  .jimu-primary-loading::after {
    animation: none;
  }
}
</style>
