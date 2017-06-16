// Angular Modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

// Third party Modules
import { LoopBackConfig, SDKBrowserModule } from '@colmena/admin-lb-sdk'

// Local Modules
import { ColmenaLayoutModule } from '@colmena/admin-layout'
import { ColmenaUiModule } from '@colmena/admin-ui'

// Local Components/Routes/Services
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AppService } from './app.service'
import { LogService } from './log.service'
import { AppStoreModule } from './app.store'

import { NotFoundComponent } from './components/not-found/not-found.component'
import { RouterComponent } from './components/router/router.component'

import { ContentConfigModule } from '@colmena/module-admin-content'
import { SystemConfigModule } from '@colmena/module-admin-system'

const moduleConfigs = [
  ContentConfigModule,
  SystemConfigModule
]


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,

    SDKBrowserModule.forRoot(),
    ColmenaLayoutModule,
    ColmenaUiModule,

    AppStoreModule,
    AppRoutingModule,

    ...moduleConfigs,
  ],
  providers: [
    AppService,
    LogService,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    RouterComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {

  configureLoopBack() {
    const apiConfig = JSON.parse(window.localStorage.getItem('apiConfig'))

    LoopBackConfig.setBaseURL(apiConfig.baseUrl)
    LoopBackConfig.setApiVersion(apiConfig.version)
    this.logService.info(`Configure LoopBack: ${apiConfig.baseUrl}/${apiConfig.version}`)
  }

  constructor(
    private appService: AppService,
    private logService: LogService,
  ) {
    this.configureLoopBack()
    this.appService.fetchSettings()
    this.appService.fetchDomains()
  }

}
