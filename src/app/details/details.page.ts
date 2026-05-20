import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../services/currency.service'; // IMPORTA O SERVIÇO

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {

  public codigoMoeda: string = '';
  public dadosMoeda: any = {};
  public moedasDestaque: any[] = [];

  // Injeta o CurrencyService no lugar do HttpClient
  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService 
  ) { }

  ngOnInit() {
    this.codigoMoeda = this.route.snapshot.paramMap.get('id') || '';
    this.carregarDetalhes();
  }

  carregarDetalhes() {
    this.currencyService.getTaxas(this.codigoMoeda).subscribe({
      next: (res: any) => {
        this.dadosMoeda = res.conversion_rates;
        const principais = ['USD', 'BRL', 'EUR', 'GBP', 'JPY', 'BTC'];
        
        this.moedasDestaque = Object.keys(this.dadosMoeda)
          .filter(key => principais.includes(key) && key !== this.codigoMoeda)
          .map(key => ({
            sigla: key,
            valor: this.dadosMoeda[key]
          }));
      }
    });
  }
}