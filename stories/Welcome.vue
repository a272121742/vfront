<template>
  <div class="main">
    <h1>欢迎来到故事书</h1>
    <p>
      这是应用程序UI组件的开发环境
    </p>
    <p>
      我们在这里添加了一些基本故事
      <code class="code">src/stories</code>
      <br />
      通过这份故事书，你可以可视化的方式看见本项目的所有组件
      <br />
      (基本上就是一个视觉上的测试用例)
    </p>
    <p>
      See these sample
      <br />
      <a class="link" @click="onClick" role="button" tabIndex="0">stories</a>
      <br />
      for a component called
      <br />
      <code class="code">Button</code>
      .
    </p>
    <p>
      Just like that, you can add your own components as stories.
      <br />
      You can also edit those components and see changes right away.
      <br />
      (Try editing the <code class="code">Button</code> component
      located at <code class="code">src/stories/Button.js</code>.)
    </p>
    <p>
      This is just one thing you can do with Storybook.
      <br />
      Have a look at the
      <br />
      <a
        class="link"
        href="https://github.com/storybooks/storybook"
        target="_blank"
        rel="noopener noreferrer"
      >
        Storybook
      </a>
      <br />
      repo for more information.
    </p>
    <p class="note">
      <b>NOTE:</b>
      <br />
      Have a look at the
      <br />
      <code class="code">.storybook/webpack.config.js</code>
      <br />
      to add webpack
      loaders and plugins you are using in this project.
    </p>
  </div>
</template>

<script>
  const log = () => console.log('Welcome to storybook!')

  export default {
    name: 'welcome',

    props: {
      showApp: {
        type: Function,
        default: log
      }
    },

    methods: {
      onClick (event) {
        event.preventDefault()
        this.showApp()
      }
    }
  }
</script>

<style>
  .main {
    margin: 15px;
    max-width: 600px;
    line-height: 1.4;
    font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
  }

  .logo {
    width: 200px;
  }

  .link {
    color: #1474f3;
    text-decoration: none;
    border-bottom: 1px solid #1474f3;
    padding-bottom: 2px;
  }

  .code {
    font-size: 15px;
    font-weight: 600;
    padding: 2px 5px;
    border: 1px solid #eae9e9;
    border-radius: 4px;
    background-color: #f3f2f2;
    color: #3a3a3a;
  }

  .note {
    opacity: 0.5;
  }
</style>
