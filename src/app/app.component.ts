import { Component } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  before = '';
  after = '';

  constructor(private papa: PapaParseService) {
    let csvData = `A,B,C,D,E
00001,テスト,テスト,テスト,テスト
00002,テスト,"<p>これは、改行コードが含まれています。
改行されました。",<span style=""color: #ff0000;"">,テスト
00003,"テスト",テスト,"テス,トフィールド内にカンマ",テスト
00004,テスト,テスト,"<p>これは、改行コードが含まれています。

改行もするし、エスケープも,含まれます。。",<span style=""color: #ff0000;"">,テスト,テスト
00005,テスト,テスト,テスト,テスト`;
    this.before = csvData;

    this.papa.parse(csvData, {
      complete: (results, file) => {
        console.log('parsed all data: ', results, file);
        for(var i=0; i<results.data.length; i++) {
          var row = results.data[i];
          console.log('parsed a record data: ', row);
          for(var j=0; j<row.length; j++) {
            console.log('parsed a cell data: ', row[j]);
            // セル内で改行されている可能性があるため、replaceする。
            this.after += row[j].replace(/\r?\n/g, '*セル内改行*');
            // サンプルとして、セル間セパレーターを入れる。
            this.after += "|";
          }
          // サンプルとして、行間セパレーターを入れる。
          this.after += '\n';
        }
      }
    });
  }
}