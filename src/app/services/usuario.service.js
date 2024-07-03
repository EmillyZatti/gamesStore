const API_URL = "http://localhost:3000/users";

export class UsuarioService {
  async addUsuario(user) {
    try {
      const respostaAPI = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          pais: user.pais,
          usuario: user.usuario,
          senha: user.senha,
        }),
      });
      if (!respostaAPI.ok) {
        throw new Error("Erro ao adicionar usuário");
      }
      const data = await respostaAPI.json();
      return data;
    } catch (error) {
      alert(error);
    }
  }

  async verificarUsuario(email, senha) {
    try {
      const response = await fetch(
        `http://localhost:3000/users?_email=${email}&_senha=${senha}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar os dados da API");
      }

      const usuarioEncontrado = await response.json();

      // Verifica se encontrou algum usuário com os dados fornecidos
      return usuarioEncontrado.length > 0;
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      return false; // Retorna falso em caso de erro ou usuário não encontrado
    }
  }

  async verificaEmail(email) {
    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${email}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados da API");
      }
      const usuarios = await response.json();
      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === email
      );
      return usuarioEncontrado ? true : false;
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      return false;
    }
  }

  async getEmail(email) {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados da API");
      }
      const usuarios = await response.json();
      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === email // Replace _email with email
      );

      if (usuarioEncontrado) {
        let valor = usuarioEncontrado.email;
        return valor;
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUsuario(email) {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados da API");
      }
      const usuarios = await response.json();
      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === email
      );

      if (usuarioEncontrado) {
        let valor = usuarioEncontrado.usuario;
        return valor;
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPais(email) {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados da API");
      }
      const usuarios = await response.json();
      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === email
      );

      if (usuarioEncontrado) {
        let valor = usuarioEncontrado.pais;
        return valor;
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
