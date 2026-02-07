import { Component,OnInit } from '@angular/core';
import { LayoutProps } from './layoutprops';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  props: LayoutProps = {
    titulo: '',
    subTitulo: ''
  } 

  constructor(private router: Router,private activatedRoute: ActivatedRoute) { 

  }
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.props = this.obterPropriedadeLayout();
    });
  }

  obterPropriedadeLayout(): LayoutProps {
    let rotaFilha = this.activatedRoute.firstChild;
    while(rotaFilha?.firstChild) {
      rotaFilha = rotaFilha.firstChild;
    }
    return rotaFilha?.snapshot.data as LayoutProps;
  }

}

