import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as opentracing from 'opentracing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  //tracer = new opentracing.Tracer();
  result: any;
  responseData: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: {content: string}) {
    // Send Http request
    console.log(JSON.parse(postData.content));
    this.http
      .post(
        'http://localhost:8080/api/v1/employees',
        JSON.parse(postData.content)
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    const tracer = new opentracing.MockTracer();
   // opentracing.initGlobalTracer( new opentracing.MockTracer());
   //const tracer = opentracing.globalTracer();
    const url = 'http://localhost:8080/api/v1/employees';

    this.http.get('http://localhost:8080/api/v1/employees').subscribe(responseData => {
      console.log(responseData);
      this.responseData = responseData;
    });

    const span = tracer.startSpan('parent_span');
    span.setTag('custom', 'tag value');
    span.setTag('alpha', '1000');

    //const span = opentracing.globalTracer().startSpan('Get:80');
    this.http.get(url).subscribe((data) => {
      this.result = data;
      span.log({response : this.result});

    },

    error => {
      this.result = error;
      span.setTag('error', true);
      span.log({data: this.result});
    },
    () => {
      span.finish();
      const report = tracer.report();
      for (const span of report.spans) {
          const tags = span.tags();
          const tagKeys = Object.keys(tags);

          console.log(`    ${span.operationName()} - ${span.durationMs()}ms`);
          for (const key of tagKeys) {
              const value = tags[key];
              console.log(`        tag '${key}':'${value}'`);
          }
      }
    });


  }

  onClearPosts() {
    // Send Http request
  }
}
