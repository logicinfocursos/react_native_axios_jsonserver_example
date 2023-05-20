import { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View, FlatList, TextInput, Button, TouchableOpacity } from 'react-native'
import { apiGET, apiPOST, apiDELETE, apiPUT } from './src/services'



export default function App() {


  const save = () => {

    const _post = {
      ...post_selected,
      title: post_selected.title,
      author: post_selected.author
    }

    setPost_selected(_post)

    if (post_selected && post_selected.id) update(_post)

    else add(_post)

  }

  const add = async (_post) => {

    const response = await apiPOST({ table: 'posts', objToAdd: _post })
    const new_posts = posts
    new_posts.push(response)
    setPosts(new_posts)

  }

  const update = async (_post) => {

    const response = await apiPUT({ table: 'posts', objToUpdate: _post })
    if (response) {
      const new_posts = posts.filter((i) => i.id !== post_selected.id)
      new_posts.push(_post)
      setPosts(new_posts)
    }
  }


  const Item = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => setPost_selected(item)}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  )


  const eraseItem = async () => {

    const response = await apiDELETE({table:'posts', id:post_selected.id})

    if (response) {
      const new_posts = posts.filter((i) => i.id !== post_selected.id)

      setPosts(new_posts)
      setPost_selected([])
    }
  }


  const [posts, setPosts] = useState([])
  const [post_selected, setPost_selected] = useState([])

  const fetchdata = async () => {

    const response = await apiGET({ table: 'posts' })

    setPosts(response)

  }

  useEffect(() => {
    fetchdata()
  }, [])

  useEffect(() => {

  }, [post_selected, posts])



  if (!posts) return false



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
      />
      <TextInput
        onChangeText={(value) => setPost_selected({ ...post_selected, title: value })}
        value={post_selected.title}
        placeholder="título do post"
        style={styles.input}
      />

      <TextInput
        onChangeText={(value) => setPost_selected({ ...post_selected, author: value })}
        value={post_selected.author}
        placeholder="autor do post"
        style={styles.input}
      />

      <Button
        onPress={save}
        title="salvar"
        color="blue"
        accessibilityLabel="salvar registro"
      />

      <Button
        onPress={eraseItem}
        title="excluir"
        color="red"
        accessibilityLabel="excluir registro"
      />

      <Button
        onPress={() => setPost_selected([])}
        title="limpar campos"
        color="green"
        accessibilityLabel="limpar campos"
      />

      <FlatList
        data={posts}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  input: {
    fontSize: 32,
    borderColor: "gray",
    borderWidth: 1,
    margin: 20,
    padding: 5
  },
})