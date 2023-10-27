import React, { useContext, useEffect, useState } from 'react';
import { ButtonCard, CardPost, CardStyle, ContainerCard, ContainerCardHome, ContainerPerfil, ConteudoCard, EditPost, ImgCard, ImgPost, MensagemCard, NomeCard, PerfilUsuario, TituloCard } from './style';
import { getPostAll } from '../../services/requests';
import Comentar from '../Comentar/Comentar';
import { GlobalStateContect } from '../../GlobalState/GlobalStateContext';

function Card() {

    const [loading, setLoading] = useState(true)
    const [forumTopics, setFourmTopics] = useState([])

    const {selectedPostID} = useContext(GlobalStateContect)

    useEffect(()=>{
      getPostAll(setForumTopics)
    },[])
 
  return (
    <>
      {
        loading ?(
          <ContainerCard>
            {forumTopics && forumTopics.map(dado =>{
              return(
                <CardStyle key={dado.post.id}>
                  <PerfilUsuario>
                    <ImgCard src={'https://th.bing.com/th/id/R.dc1c4ef6daf7348debcc50c57cb60546?rik=AY%2bfG5eClg%2f1rA&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f18900000%2fNaruto-Uzumaki-uzumaki-naruto-shippuuden-18920948-1280-720.jpg&ehk=JMkC90waP0fjJSxHTVzwme9sY56ISZa5RteNiWqiE7c%3d&risl=&pid=ImgRaw&r=0'} />

                    <ContainerPerfil>
                      <NomeCard>{dado.creator_username}</NomeCard>
                      <MensagemCard>{dado.post_created_at}</MensagemCard>
                    </ContainerPerfil>
                  </PerfilUsuario>

                  <TituloCard>{dado.post_title}
                  </TituloCard>
                  <CardPost>
                    <ImgPost src={dado.post_imagem} alt="foto post"/>
                    <ConteudoCard>{dado.post_content}</ConteudoCard>
                  </CardPost>

                  <EditPost>
                    <Comentar 
                      postId={dado.post_id}
                      comments={dado.comments}
                      autorId={dado.created_id}
                    />
                  </EditPost>
                </CardStyle>
              )
            })}
          </ContainerCard>
        ):(<p>Loading</p>)
      }


    </>
  )
}

export default Card