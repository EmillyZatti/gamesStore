import { UsuarioService } from '../services/usuario.service.js';

export class User {
  constructor(email, pais, usuario, senha) {
    this._email = email;
    this._pais = pais;
    this._usuario = usuario;
    this._senha = senha;
    this.service = new UsuarioService();
  }

  set email(email) {
    this._email = email;
  }

  set pais(pais) {
    this._pais = pais;
  }

  set usuario(usuario) {
    this._usuario = usuario;
  }

  set senha(senha) {
    this._senha = senha;
  }

  get email() {
    return this._email;
  }

  get pais() {
    return this._pais;
  }

  get usuario() {
    return this._usuario;
  }

  get senha() {
    return this._senha;
  }

  async getCadastro(email) {
    const data = await this.service.getUsuario(email);
    this.email = data.email;
    this.pais = data.pais;
    this.usuario = data.usuario;
    this.senha = data.senha;
  }

  async salvar() {
    const data = await this.service.addUsuario(this);
    this.email = data.email;
    this.pais = data.pais;
    this.usuario = data.usuario;
    this.senha = data.senha;
  }
}
