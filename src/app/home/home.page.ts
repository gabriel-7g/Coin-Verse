import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// IMPORTS DOS NOVOS REQUISITOS
import { CurrencyService } from '../services/currency.service';
import { TruncatePipe } from '../pipes/truncate-pipe';
import { HighlightDirective } from '../directives/highlight';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, TruncatePipe, HighlightDirective] 
})
export class HomePage implements OnInit {

  public moedaBase: string = 'USD';
  public taxasConversao: { [key: string]: number } = {};
  public dicionarioNomes: { [key: string]: string } = {};
  public textoPesquisa: string = '';

  public moedasPrincipais = [
    { codigo: 'USD', nome: 'Dólar Americano' },
    { codigo: 'BRL', nome: 'Real Brasileiro' },
    { codigo: 'EUR', nome: 'Euro' },
    { codigo: 'GBP', nome: 'Libra Esterlina' },
    { codigo: 'JPY', nome: 'Iene Japonês' },
    { codigo: 'BTC', nome: 'Bitcoin' }
  ];

  private traducoes: { [key: string]: string } = {
    'United States': 'Estados Unidos', 'Dollar': 'Dólar', 'Brazilian': 'Brasileiro',
    'Real': 'Real', 'Eurozone': 'Zona do Euro', 'United Kingdom': 'Reino Unido',
    'Pound': 'Libra', 'Sterling': 'Esterlina', 'Japanese': 'Japonês', 'Yen': 'Iene',
    'Argentine': 'Argentino', 'Peso': 'Peso', 'Canadian': 'Canadense'
  };

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.carregarNomesOficiais();
  }

  carregarNomesOficiais() {
    this.currencyService.getNomesOficiais().subscribe({
      next: (resultado: any) => {
        if (resultado && resultado.supported_codes) {
          resultado.supported_codes.forEach((par: string[]) => {
            this.dicionarioNomes[par[0]] = par[1];
          });
        }
        this.buscarTaxas();
      }
    });
  }

  alterarMoedaBase(event: any) {
    this.moedaBase = event.detail.value;
    this.buscarTaxas();
  }

  traduzirTexto(texto: string): string {
    let textoTraduzido = texto;
    Object.keys(this.traducoes).forEach(termoIngles => {
      const expressaoRegular = new RegExp(`\\b${termoIngles}\\b`, 'g');
      textoTraduzido = textoTraduzido.replace(expressaoRegular, this.traducoes[termoIngles]);
    });
    return textoTraduzido;
  }

  obterPaisEMoeda(codigo: string): { moeda: string, pais: string } {
    const nomeCompleto = this.dicionarioNomes[codigo];
    if (!nomeCompleto) return { moeda: codigo, pais: 'Global' };

    const partes = nomeCompleto.split(' ');
    if (partes.length > 1) {
      const moedaIngles = partes.pop()!;
      const paisIngles = partes.join(' ');
      return { 
        moeda: this.traduzirTexto(moedaIngles), 
        pais: this.traduzirTexto(paisIngles) 
      };
    }
    return { moeda: this.traduzirTexto(nomeCompleto), pais: 'Global' };
  }

  filtrarMoedas(item: any): boolean {
    if (!this.textoPesquisa) return true;
    const termo = this.textoPesquisa.toLowerCase();
    const codigoMoeda = item.key.toLowerCase();
    const dados = this.obterPaisEMoeda(item.key);
    return codigoMoeda.includes(termo) || dados.moeda.toLowerCase().includes(termo) || dados.pais.toLowerCase().includes(termo);
  }

  buscarTaxas() {
    this.currencyService.getTaxas(this.moedaBase).subscribe({
      next: (resultado: any) => {
        this.taxasConversao = resultado.conversion_rates;
      }
    });
  }
}