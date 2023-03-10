import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { QuestionListComponent } from './Components/question-list/question-list.component';
import { SingleQuestionComponent } from './Components/single-question/single-question.component';
import { FormComponent } from './Components/form/form.component';
import { FavoriteListComponent } from './Components/favorite-list/favorite-list.component';
import { Secret } from './secret';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    QuestionListComponent,
    SingleQuestionComponent,
    FormComponent,
    FavoriteListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'question-list', component: QuestionListComponent },
      { path: 'favorite-list', component: FavoriteListComponent}

    ])
  ],
  providers: [{
  	provide: 'SocialAuthServiceConfig',
  	useValue: {
    	autoLogin: false,
    	providers: [
      	{
        	id: GoogleLoginProvider.PROVIDER_ID,
        	provider: new GoogleLoginProvider(
          	Secret.clientID
        	)
      	}
    	]
  	} as SocialAuthServiceConfig,
	}],
  bootstrap: [AppComponent]
})
export class AppModule { }

