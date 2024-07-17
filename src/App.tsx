import { AppProviderWrapper } from "./core/providers/appProvider";
import UILayout from "./layout";

function App() {
  return (
    <AppProviderWrapper>
      <UILayout/>
    </AppProviderWrapper>
  )
}

export default App
