
import { useState } from 'react'

interface Menu {
  App: string
  Page: string
  PageName: string,
  object?: any
}


interface IState {
  Menu: Menu[]
}

export default function Home() {

  const [render, SetRender] = useState(false)
  const [state] = useState<IState>({ Menu: [] })
  const that = {
    RenderView: () => {
      SetRender(!render);
    },
    getMenu: async () => {

      if (state.Menu.length == 0) {
        /**
         * get remote menu list api
         */
        state.Menu.push({ App: "App1", Page: "Home", PageName: "App1 Home Page Sample" })
        state.Menu.push({ App: "App1", Page: "Home2", PageName: "App1 Home2 Page Sample" })
        that.RenderView();
      }
    },
    Open: async (m: Menu) => {
      if (m.object == null) {
        m.object = await that.getRemotePage(m);
      }
      if (m.object != null) {
        that.RenderView();
      }
    },
    getRemotePage: async (m: Menu) => {
      const AppList: any = {
        App1: (await import("App1/PAGES" as any) as any).default
      }
      let Remote: any = null;
      if (AppList[m.App] != null && AppList[m.App][m.Page] != null) {
        Remote = AppList[m.App][m.Page];
        return <Remote key={m.App + "_" + m.Page} />;
      }
      return null;
    }
  }
  that.getMenu();
  return (
    <div>
      <div style={{ width: "30%", minWidth: 200, border: "1px solid white", float: "left" }}>
        <ul key={"xx"}>
          {
            state.Menu.map(t => {
              return <li key={t.Page}><button onClick={() => that.Open(t)}>{t.PageName}</button></li>
            })
          }
        </ul>
      </div>
      <div id="REMOTE_COMPONENTS" style={{ width: "70%", minWidth: 200, border: "1px solid white", float: "right" }}>

        {
          state.Menu.filter(t => t.object != null).map(t => {

            return (<div key={"PAGES" + t.App + "_" + t.Page}>
              {t.PageName}
              <hr />
              {t.object}
            </div>);
          })
        }


      </div>
      <div style={{ clear: "both" }}></div>
    </div>
  )
}
