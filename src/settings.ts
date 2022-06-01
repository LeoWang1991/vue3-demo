/**
 * 全局页面配置项
 */

interface SettingTy {
  title: string,
  sidebarLogo: boolean,
  showLeftMenu: boolean,
  ShowDropDown: boolean,
  showHamburger: boolean,
  isNeedLogin: boolean,
  isNeedNprogress: boolean,
  showTagsView: boolean,
  tagsViewNum: number,
  openProdMock: boolean,
  errorLog: string | Array<string>,
  permissionMode: string,
  delWindowHeight: string,
  tmpToken: string,
  showNavbarTitle: boolean,
  showTopNavbar: boolean,
  mainNeedAnimation: boolean,
  viteBasePath: string
}

const setting: SettingTy = {
  title: 'Vue3 Admin ts',
  sidebarLog: true,
  showNavbarTitle: false,
  ShowDropDown: true,
  showHamburger: true,
  showLeftMenu: true,
  showTagsView: true,
  tagsViewNum: 6,
  showTopNavbar: true,
  mainNeedAnimation: true,
  isNeedNprogress: true,
  isNeedLogin: true,
  permissionMode: 'roles',
  openProdMock: true,
  errorLog: ['prod'],
  delWindowHeight: '210px',
  tmpToken: 'tmp_token',
  viteBasePath: '/vue3-admin-ts'
}

export default setting