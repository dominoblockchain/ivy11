<template>
  <div class="description-comp">
    <!--项目介绍-->
    <div class="description-comp_project">
      <div class="description-comp_title">{{ $t('home.project') }}</div>
      <p class="description-comp-project_content">{{ $t('home.projectDes') }}</p>
    </div>
    <!--审计机构-->
    <div class="description-comp_audit">
      <div class="description-comp_title">{{ $t('home.audit') }}</div>
      <div class="description-comp_org">
        <img src="@img/home/org_4.png">
      </div>
    </div>
    <!--合作伙伴-->
    <div class="description-comp_cooperation">
      <div class="description-comp_title">{{ $t('home.partner') }}</div>
      <div class="description-comp-cooperation_wrapper">
        <div class="description-comp_org"><img src="@img/home/org_1.png"></div>
        <div class="description-comp_org"><img src="@img/home/org_2.png"></div>
        <div class="description-comp_org"><img src="@img/home/org_3.png"></div>
        <div class="description-comp_org"><img src="@img/home/org_4.png"></div>
      </div>
    </div>
    <!--copyright-->
    <div class="description-comp_copyright">
      Copyright © 2022 CUSE. ALL Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionComp'
}
</script>

<style lang="less" scoped>
.description-comp {
  width: 340px;
  margin: auto;
  //标题
  .description-comp_title {
    font-size: 18px;
    color: #808080;
  }
  //其他机构
  .description-comp_org {
    width: 166px;
    height: 42px;
    line-height: 42px;
    background-color: #FFFFFF;
    border-radius: var(--mining-radius);
    img {
      width: 100px;
    }
  }
  //1.项目介绍
  .description-comp_project {
    margin-bottom: 50px;
    .description-comp_title {
      margin-bottom: 16px;
    }
    .description-comp-project_content {
      color: var(--primary-color);
      padding: 20px;
      text-align: left;
      font-size: 16px;
      background-color: #FFFFFF;
      border-radius: var(--mining-radius);
    }
  }
  //2.审计机构
  .description-comp_audit {
    margin-bottom: 50px;
    .description-comp_title {
      margin-bottom: 26px;
    }
    .description-comp_org {
      margin: auto;
    }
  }
  //3.合作伙伴
  .description-comp_cooperation {
    margin-bottom: 50px;
    .description-comp_title {
      margin-bottom: 26px;
    }
    .description-comp_org {
      margin-bottom: 10px;
    }
    .description-comp-cooperation_wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
  //4.copyright
  .description-comp_copyright {
    margin-bottom: 50px;
    font-size: 12px;
    color: #808080;
  }
}
</style>
