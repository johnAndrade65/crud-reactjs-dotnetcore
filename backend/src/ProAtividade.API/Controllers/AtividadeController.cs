using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        public readonly IAtividadeService _atividadeService;

        public AtividadeController(IAtividadeService atividadeService)
        {
            _atividadeService = atividadeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var atividades = await _atividadeService.PegarTodasAtividadesAsync();
                if (atividades == null)
                {
                    return NoContent();
                }
                return Ok(atividades);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar atividades. Erro {ex.Message}"
                );
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                if (atividade == null)
                {
                    return NoContent();
                }
                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar atividade com id: {id}. Erro {ex.Message}"
                );
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(Atividade model)
        {
            try
            {
                var atividade = await _atividadeService.AdicionarAtividade(model);
                if (atividade == null)
                {
                    return NoContent();
                }
                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adiconar atividades: Erro {ex.Message}"
                );
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Atividade model)
        {
            try
            {
                if (model.Id != id)
                {
                    return this.StatusCode(
                        StatusCodes.Status409Conflict,
                        "Você está tentando atualizar a atividade errada"
                    );
                }

                var atividade = await _atividadeService.AtualizarAtividade(model);
                if (atividade == null)
                {
                    return NoContent();
                }
                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar atividade com id: {id}. Erro {ex.Message}"
                );
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                if (atividade == null)
                {
                    return this.StatusCode(
                        StatusCodes.Status500InternalServerError,
                        "Você está tentando deletar a atividade que não existe"
                    );
                }
                if (await _atividadeService.DeletarAtividade(id))
                {
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    return BadRequest(
                        "Ocorreu um problema não específico a tentat deletar a atividade."
                    );
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar atividade com id: ${id}. Erro: {ex.Message}"
                );
            }
        }
    }
}
